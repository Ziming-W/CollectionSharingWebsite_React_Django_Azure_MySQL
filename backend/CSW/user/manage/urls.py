from django.urls import path
from . import views


urlpatterns = [
    path('uploadPost', views.uploadPost),
    path('deletePost/<int:post_id>', views.deletePost), 
]