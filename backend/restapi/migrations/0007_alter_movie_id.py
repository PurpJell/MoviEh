# Generated by Django 5.1.2 on 2024-12-16 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0006_remove_personalizedmovie_movie_ptr_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]