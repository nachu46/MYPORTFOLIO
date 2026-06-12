import os

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'href="https://instagram.com/"' in content:
                content = content.replace('href="https://instagram.com/"', 'href="https://instagram.com/nazuk.kasim"')
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print("Instagram links updated with username")
