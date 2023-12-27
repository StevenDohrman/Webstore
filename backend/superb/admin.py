from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity', 'img_url', 'description')
    fields = ('name', 'price', 'quantity', 'img_url', 'description')

admin.site.register(Product, ProductAdmin)
