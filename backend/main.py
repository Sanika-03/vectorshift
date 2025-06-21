# main.py
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineInput(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineInput):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    graph = {node["id"]: [] for node in nodes}
    for edge in edges:
        graph[edge["source"]].append(edge["target"])

    def has_cycle(node, visited, rec_stack):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor, visited, rec_stack):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(node)
        return False

    visited = set()
    is_dag = True
    for node in graph:
        if node not in visited:
            if has_cycle(node, visited, set()):
                is_dag = False
                break

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
