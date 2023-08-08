from rest_framework.decorators import api_view
from rest_framework.response import Response
from nltk.util import ngrams

@api_view(['POST'])
def get_ngrams(request):
    try:
        texts = request.data.get('texts', [])
        if len(texts) < 2:
            return Response({'error': 'Not enough texts for comparison'}, status=400)

        n = 2  # Change this value to the desired ngram size
        ngram_list = []

        for text in texts:
            tokens = text.split()
            ngram_list.append(list(ngrams(tokens, n)))

        # print(ngram_list)

        return Response(ngram_list, status=200)
    except Exception as e:
        print('Error:', e)
        return Response({'error': 'An error occurred'}, status=500)
