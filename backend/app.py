from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for invoices (replace with a database for production)
invoices = []

# API to fetch all invoices
@app.route('/api/invoices', methods=['GET'])
def get_invoices():
    return jsonify(invoices), 200

# API to add a new invoice
@app.route('/api/invoices', methods=['POST'])
def add_invoice():
    data = request.json
    new_invoice = {
        "id": len(invoices) + 1,
        "customer_name": data.get('customer_name'),
        "items": data.get('items'),  # List of items [{name, price, quantity}]
        "total": sum(item['price'] * item['quantity'] for item in data.get('items', []))
    }
    invoices.append(new_invoice)
    return jsonify(new_invoice), 201

# API to update an existing invoice
@app.route('/api/invoices/<int:invoice_id>', methods=['PUT'])
def update_invoice(invoice_id):
    data = request.json
    for invoice in invoices:
        if invoice['id'] == invoice_id:
            invoice['customer_name'] = data.get('customer_name', invoice['customer_name'])
            invoice['items'] = data.get('items', invoice['items'])
            invoice['total'] = sum(item['price'] * item['quantity'] for item in invoice['items'])
            return jsonify(invoice), 200
    return jsonify({"error": "Invoice not found"}), 404

# API to delete an invoice
@app.route('/api/invoices/<int:invoice_id>', methods=['DELETE'])
def delete_invoice(invoice_id):
    global invoices
    invoices = [invoice for invoice in invoices if invoice['id'] != invoice_id]
    return jsonify({"message": "Invoice deleted"}), 200

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
