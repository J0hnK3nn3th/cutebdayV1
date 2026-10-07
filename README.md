# Birthday greeting

A small, responsive Happy Birthday page built with Django. It uses one server-rendered template, a custom illustration made in CSS, and a tiny confetti interaction with no database or build step.

## Run locally

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py runserver
```

Open `http://127.0.0.1:8000/`.

## Deploy to Render

Push this folder to a Git repository and create a new Render Blueprint, or create a Python web service with:

- Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- Start command: `gunicorn birthday_project.wsgi:application`

The included `render.yaml` configures those commands and generates a `SECRET_KEY` automatically.

To personalize the page, edit the copy in `templates/birthday/home.html` and the date stamp in the header.
