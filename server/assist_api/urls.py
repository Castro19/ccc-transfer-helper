from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_api, name='test-api'),
    path('univs/<str:ccc_id>/', views.get_univs_by_id, name='univs-by-id'),
    path('univs/<str:ccc_id>/<str:univ_id>/', views.get_majors_by_id, name='majors-by-id'),
]
