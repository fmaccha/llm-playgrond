# Simple web UI to run an LLM on a GPU of an M1 Mac

This repository adapts the tool from [the original repository](https://github.com/suecharo/llm-playgrond) to:

- Perform computations on a GPU
- Convert into a server using FastAPI

Additionally, this repository provides a web UI that makes use of these APIs.

See [the original repository](https://github.com/suecharo/llm-playgrond) for more information.

## Environment

This guide is tested on Ventura 13.3.

### backend

Create a new conda environment.

```sh
conda create -n llm python=3.10.9
conda activate llm
pip3 install torch torchvision torchaudio
pip3 uninstall -y llama-cpp-python
CMAKE_ARGS="-DLLAMA_METAL=on" FORCE_CMAKE=1 pip3 install llama-cpp-python --no-cache-dir
pip3 install -U --pre torch torchvision -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html
```

Go to the `backend` directory.

```sh
cd backend
```

Run the application.

```sh
uvicorn main:app
```

### web UI

```sh
docker compose up --build
```

Then browse to `http://localhost:3000/`.
