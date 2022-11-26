from rest_framework import serializers
from .models import Post
from .models import Picture
from django.contrib.auth.models import User

#####Ziming's serializer
#####There is another serializer in /api, made by Matt
class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture 
        fields = '__all__'

class UserSerializer_Username(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username'] 

class UserSerializer_Profile(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'date_joined']

class PostSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True, read_only=True)
    belongToUser = UserSerializer_Profile()
    class Meta: 
        model = Post
        fields = '__all__'




