from typing import Any, List

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from starlette.middleware.cors import CORSMiddleware

from transformers import pipeline


class FillMask(BaseModel):
  model_name: str
  sentence: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def _fill_mask(model: str, sentence: str) -> Any:
  classifier = pipeline("fill-mask", model=model)
  return classifier(sentence)


@app.post("/process")
def process(fill_mask: FillMask):
  # https://huggingface.co/microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract-fulltext
  model = "microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract-fulltext"
  # https://huggingface.co/emilyalsentzer/Bio_ClinicalBERT
  # model = "emilyalsentzer/Bio_ClinicalBERT"

  sentence = "[MASK] is a tumor suppressor gene."

  result = _fill_mask(fill_mask.model_name, fill_mask.sentence)
  print(result)
  return result


if __name__ == "__main__":
  uvicorn.run(app)
