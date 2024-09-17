import os
import opendatasets
from pathlib import Path
from tempfile import gettempdir

datasets_dir = Path("datasets")
datasets_tempdir = Path(gettempdir()) / "Fyama"


def download_dataset(name: str, url: str) -> Path:
    dataset_path = datasets_dir / f"{name}.csv"
    if dataset_path.is_file():
        return dataset_path
    temp_folder_name = url.split("/")[-1].split("?")[0]
    temp_file_name = url.split("select=")[-1]
    if not Path("kaggle.json").is_file():
        print(
            "Please place kaggle.json file in the notebook directory and current working directory\n Learn more at http://bit.ly/kaggle-creds"
        )
        exit(1)
    print(f"Downloading {name} dataset")
    opendatasets.download(
        url,
        str(datasets_tempdir),
        force=True,
    )
    if not datasets_dir.is_dir():
        datasets_dir.mkdir(parents=True)
    (Path(datasets_tempdir) / temp_folder_name / temp_file_name).rename(dataset_path)
    print(f"Downloaded {name} dataset to {dataset_path.absolute()}")
    return dataset_path


def download_general_dataset() -> Path:
    return download_dataset(
        "general",
        "https://www.kaggle.com/datasets/mirichoi0218/insurance?select=insurance.csv",
    )


def download_medical_dataset() -> Path:
    return download_dataset(
        "medical",
        "https://www.kaggle.com/datasets/tejashvi14/medical-insurance-premium-prediction?select=Medicalpremium.csv",
    )


if __name__ == "__main__":
    download_general_dataset()
    download_medical_dataset()
