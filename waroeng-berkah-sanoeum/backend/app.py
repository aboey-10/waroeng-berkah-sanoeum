from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'secret-key-waroeng')

# File paths for data storage
PRODUCTS_FILE = 'data/products.json'
ORDERS_FILE = 'data/orders.json'

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# Initialize data files if they don't exist
def init_data_files():
    if not os.path.exists(PRODUCTS_FILE):
        with open(PRODUCTS_FILE, 'w') as f:
            json.dump([], f)
    if not os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'w') as f:
            json.dump([], f)

init_data_files()

# Helper functions
def load_json(filename):
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except:
        return []

def save_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

# Routes

# Get all products
@app.route('/api/products', methods=['GET'])
def get_products():
    products = load_json(PRODUCTS_FILE)
    return jsonify(products), 200

# Add new product
@app.route('/api/products', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        products = load_json(PRODUCTS_FILE)
        
        new_product = {
            'id': len(products) + 1,
            'name': data.get('name'),
            'category': data.get('category'),
            'price': data.get('price'),
            'description': data.get('description'),
            'stock': data.get('stock', 0),
            'rating': data.get('rating', 0),
            'reviews': data.get('reviews', 0),
            'created_at': datetime.now().isoformat()
        }
        
        products.append(new_product)
        save_json(PRODUCTS_FILE, products)
        
        return jsonify({'message': 'Product added successfully', 'product': new_product}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Get all orders
@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = load_json(ORDERS_FILE)
    return jsonify(orders), 200

# Create new order
@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        orders = load_json(ORDERS_FILE)
        
        new_order = {
            'id': len(orders) + 1,
            'customer_name': data.get('customer_name'),
            'customer_email': data.get('customer_email'),
            'customer_phone': data.get('customer_phone'),
            'items': data.get('items', []),
            'total': data.get('total', 0),
            'status': 'pending',
            'payment_method': data.get('payment_method'),
            'created_at': datetime.now().isoformat()
        }
        
        orders.append(new_order)
        save_json(ORDERS_FILE, orders)
        
        return jsonify({'message': 'Order created successfully', 'order': new_order}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Contact form submission
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        
        contact_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'message': data.get('message'),
            'created_at': datetime.now().isoformat()
        }
        
        # In production, you would send an email here
        # For now, just save to file
        contacts = load_json('data/contacts.json') if os.path.exists('data/contacts.json') else []
        contacts.append(contact_data)
        save_json('data/contacts.json', contacts)
        
        return jsonify({'message': 'Contact message received successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Health check
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'Waroeng Berkah Sanoeum API is running'}), 200

# 404 Error Handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

# 500 Error Handler
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)