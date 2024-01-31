from django.shortcuts import render
from .models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer
from django.core.management import call_command


class ListProducts(APIView):
    def get(self, request):
        products = Product.objects.all()
        product_serializer = ProductSerializer(products, many=True)

        return Response({'products': product_serializer.data})

class GetProductBySlug(APIView):
    def get(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')

        if not slug:
            call_command('populate_slugs')
            
            product = Product.objects.last()
        else:
            try:
                product = Product.objects.get(slug=slug)
            except Product.DoesNotExist:
                print(f'Product not found with slug: {slug}')
                
                call_command('populate_slugs')
                
                product = Product.objects.last()

        product_serializer = ProductSerializer(product)
        return Response({'product': product_serializer.data})

