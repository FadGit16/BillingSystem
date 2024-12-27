from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection details
DB_CONFIG = {
    'host': 'localhost',   # Replace with your MySQL server address
    'user': 'root',  # Replace with your MySQL username
    'password': 'root',  # Replace with your MySQL password
    'database': 'billing_system'  # Replace with your database name
}

# Helper function to get database connection
def get_db_connection():
    conn = mysql.connector.connect(**DB_CONFIG)
    return conn

# API to fetch all invoices
@app.route('/api/invoices', methods=['GET'])
def get_invoices():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM invoices')
    invoices = cursor.fetchall()
    conn.close()
    return jsonify(invoices), 200

# API to add a new invoice
@app.route('/api/invoices', methods=['POST'])
def add_invoice():
    data = request.json
    customer_name = data.get('customer_name')
    items = data.get('items')

    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in items)

    # Insert invoice and items
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO invoices (customer_name, total) VALUES (%s, %s)', (customer_name, total))
    invoice_id = cursor.lastrowid

    for item in items:
        cursor.execute('INSERT INTO items (invoice_id, name, price, quantity) VALUES (%s, %s, %s, %s)', 
                       (invoice_id, item['name'], item['price'], item['quantity']))

    conn.commit()
    conn.close()

    return jsonify({"id": invoice_id, "customer_name": customer_name, "total": total, "items": items}), 201

# API to update an invoice
@app.route('/api/invoices/<int:invoice_id>', methods=['PUT'])
def update_invoice(invoice_id):
    data = request.json
    customer_name = data.get('customer_name')
    items = data.get('items')

    # Calculate new total
    total = sum(item['price'] * item['quantity'] for item in items)

    # Update invoice and items
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE invoices SET customer_name = %s, total = %s WHERE id = %s', 
                   (customer_name, total, invoice_id))

    cursor.execute('DELETE FROM items WHERE invoice_id = %s', (invoice_id,))
    for item in items:
        cursor.execute('INSERT INTO items (invoice_id, name, price, quantity) VALUES (%s, %s, %s, %s)', 
                       (invoice_id, item['name'], item['price'], item['quantity']))

    conn.commit()
    conn.close()

    return jsonify({"id": invoice_id, "customer_name": customer_name, "total": total, "items": items}), 200

# API to delete an invoice
@app.route('/api/invoices/<int:invoice_id>', methods=['DELETE'])
def delete_invoice(invoice_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM invoices WHERE id = %s', (invoice_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Invoice deleted"}), 200

