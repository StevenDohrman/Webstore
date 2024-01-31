from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity', 'img_url', 'description', 'slug', 'stock', 'weight')
    fields = ('name', 'price', 'quantity', 'img_url', 'description', 'slug', 'stock', 'weight')

admin.site.register(Product, ProductAdmin)
