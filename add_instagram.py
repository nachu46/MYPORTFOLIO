import os

instagram_footer_link = '''<a class="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant hover:text-secondary hover:underline underline-offset-4 transition-all duration-150" href="https://instagram.com/">Instagram</a>'''

instagram_contact_icon = '''<a class="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="https://instagram.com/">
<span class="material-symbols-outlined text-sm" data-icon="photo_camera">photo_camera</span>
</a>'''

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace footer link
            target_footer = '''<a class="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant hover:text-secondary hover:underline underline-offset-4 transition-all duration-150" href="https://www.linkedin.com/in/muhammed-nazuk-a78414275">LinkedIn</a>'''
            if target_footer in content and "Instagram" not in content:
                content = content.replace(target_footer, target_footer + '\n' + instagram_footer_link)
            
            # Replace contact section icon (only in root index.html)
            target_contact = '''<a class="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="https://www.linkedin.com/in/muhammed-nazuk-a78414275">
<span class="material-symbols-outlined text-sm" data-icon="public">public</span>
</a>'''
            if target_contact in content and "photo_camera" not in content:
                content = content.replace(target_contact, target_contact + '\n' + instagram_contact_icon)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Instagram links added")
