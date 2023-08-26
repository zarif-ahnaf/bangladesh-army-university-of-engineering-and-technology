import docx

from .helpers.word import WordHelper
from docx.shared import Cm


class BaseFactory:
    def __init__(self, document: docx.Document) -> None:
        self.document = document
        # Set default font to `Times New Roman`
        style = self.document.styles["Normal"]
        style.font.name = "Times New Roman"

        # Facades
        self.word_helper = WordHelper(document)

        for section in document.sections:
            section.top_margin = Cm(1)
            section.bottom_margin = Cm(1)
