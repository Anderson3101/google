from django import forms
from .models import Manutencao

class ManutencaoForm(forms.ModelForm):
    class Meta:
        model = Manutencao
        fields = '__all__'