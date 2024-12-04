# models.py
from sqlalchemy import Column, Integer, String, Text, Index
from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Search(Base):
    __tablename__ = 'articles'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    search_vector = Column(TSVECTOR)

    __table_args__ = (
        Index('ix_article_search', 'search_vector', postgresql_using='gin'),
    )
