# Generated by Django 5.0.1 on 2024-01-30 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('superb', '0002_product_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='stock',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='quantity',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='slug',
            field=models.SlugField(blank=True, default=None, max_length=255, unique=True),
        ),
    ]
