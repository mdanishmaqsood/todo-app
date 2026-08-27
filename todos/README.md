# todos

Django REST Framework app implementing the Todo API: the `Todo` model, its serializer, viewset, routing, and tests. Database migrations live in `migrations/`.

## Files

| File | Description |
|------|-------------|
| `__init__.py` | Empty package marker for the `todos` app. |
| `admin.py` | Django admin registration (currently no models registered). |
| `apps.py` | App config declaring the `todos` app and its default auto field. |
| `models.py` | Defines the `Todo` model (title, completed, created_at, due_date, priority). |
| `serializers.py` | `TodoSerializer` — DRF `ModelSerializer` exposing all `Todo` fields. |
| `tests.py` | API test suite covering create, retrieve, list, update, delete, filter, and search. |
| `urls.py` | Registers `TodoViewSet` on a DRF `DefaultRouter` under the `todos` route. |
| `views.py` | `TodoViewSet` — CRUD viewset with filtering (completed, due_date, priority) and title search. |
