from django.urls import path
from .views import ListProducts

urlpatterns = [
    path('list-products/', ListProducts.as_view(), name="List Products")
]