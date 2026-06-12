import os
import re

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(r'href="index\.html(#[^"]*)?"', lambda m: f'href="/{m.group(1) if m.group(1) else ""}"', content)
        content = re.sub(r'href="demo-shopify\.html"', r'href="/demo-shopify"', content)
        content = re.sub(r'href="demo-databricks\.html"', r'href="/demo-databricks"', content)
        content = re.sub(r'href="demo-khair\.html"', r'href="/demo-khair"', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
print("Links updated successfully")
