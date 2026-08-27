# todo_project

Django project configuration package: settings, root URL routing, and the ASGI/WSGI application entrypoints.

## Files

| File | Description |
|------|-------------|
| `__init__.py` | Empty package marker for the `todo_project` module. |
| `asgi.py` | Exposes the ASGI `application` callable used for async deployment. |
| `settings.py` | Django settings: installed apps, middleware, CORS, SQLite database, and static files config. |
| `urls.py` | Root URL configuration; mounts the Django admin and includes `todos.urls` under `/api/`. |
| `wsgi.py` | Exposes the WSGI `application` callable used for sync deployment. |
