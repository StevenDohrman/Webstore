from django.core.management.base import BaseCommand
from superb.models import Product
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Populate slug values for existing products'

    def handle(self, *args, **kwargs):
        products_without_slugs = Product.objects.filter(slug__isnull=True)

        for product in products_without_slugs:
            product.slug = slugify(product.name)
            product.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated slugs for existing products.'))
