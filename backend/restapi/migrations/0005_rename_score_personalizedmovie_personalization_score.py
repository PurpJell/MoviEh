# Generated by Django 5.1.2 on 2024-12-16 20:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0004_personalizedmovie_score'),
    ]

    operations = [
        migrations.RenameField(
            model_name='personalizedmovie',
            old_name='score',
            new_name='personalization_score',
        ),
    ]
