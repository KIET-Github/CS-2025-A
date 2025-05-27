import pandas as pd



df = pd.read_csv("justice.csv")
unique_categories = df["issue_area"].dropna().unique()
category_info = pd.DataFrame(unique_categories, columns=["issue_area"])
category_info["description"] = "No data available"
category_info["required_documents"] = "No data available"
category_info["next_steps"] = "No data available"
category_info.to_csv("category_info.csv", index=False)

print("Category reference dataset created successfully!")
