# Generated by Django 5.1.2 on 2024-12-02 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='comedy',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='preferences',
            field=models.JSONField(default=dict),
        ),
    ]