from django.urls import path
from .views import ListProducts, GetProductBySlug

urlpatterns = [
    path('get-product/<slug:slug>/', GetProductBySlug.as_view(), name='get_product_by_slug'),
    path('list-products/', ListProducts.as_view(), name="List Products"),
]