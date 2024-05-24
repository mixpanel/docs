# Set your API key and project subdomain
API_KEY="$README_API_KEY"

read -p "Enter the title of the new category: " CATEGORY_TITLE

# Define the new category data in JSON format
new_category_data=$(cat <<EOF
{
  "title": "$CATEGORY_TITLE",
  "type": "reference"
}
EOF
)

curl -X POST "https://dash.readme.io/api/v1/categories" \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic $API_KEY" \
     -d "$new_category_data"

echo "New category created!"
