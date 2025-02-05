from django import forms
from .models import Aluguel

class AluguelForm(forms.ModelForm):
    class Meta:
        model = Aluguel
        fields = '__all__'