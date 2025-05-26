import base64

with open("credentials.json", "rb") as file:
    encoded = base64.b64encode(file.read()).decode("utf-8")

# Print the base64 string so you can copy it
print(encoded)
