# Generated by Django 4.1 on 2022-09-15 12:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_delete_test_post_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='picture',
            name='descriptions',
        ),
        migrations.AlterField(
            model_name='picture',
            name='belongToPost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pictures', to='user.post'),
        ),
    ]