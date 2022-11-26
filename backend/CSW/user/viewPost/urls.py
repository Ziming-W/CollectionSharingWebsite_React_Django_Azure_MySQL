from django.urls import path
from . import views


urlpatterns = [
    #path('', views.getHomePage),
    path('<int:post_id>', views.getSinglePost),
    path('<str:post_category>',  views.getCategoricalPosts)
]