from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..serializer import PostSerializer
from ..serializer import PictureSerializer
from ..models import Post
from ..models import Picture

@api_view(['GET'])
def getSinglePost(request, post_id):
    posts = Post.objects.filter(pk = post_id)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategoricalPosts(request, post_category):
    categoricalPosts = Post.objects.filter(category = post_category)
    serializer = PostSerializer(categoricalPosts, many=True)
    return Response(serializer.data)



