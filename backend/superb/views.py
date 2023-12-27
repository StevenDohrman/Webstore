from django.shortcuts import render
from .models import Product
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer

class ListProducts(APIView):
    def get(self, request):
        products = Product.objects.all()
        product_serializer = ProductSerializer(products, many=True)

        return Response({'products': product_serializer.data})