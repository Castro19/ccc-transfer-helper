from django.urls import path
from . import views
from .views import test_api

urlpatterns = [
    path('test/', test_api, name='test-api'),
    path('univs/<int:unique_id>/', views.get_univs_by_id, name='univs-by-id'),
]
