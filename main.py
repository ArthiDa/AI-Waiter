from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Welcome to, AI Waiter!</p>"


@app.route("/order", methods=["POST"])
def order():
    print(request.json, type(request.json))

    return "<p>Order received!</p>"
