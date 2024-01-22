import csv
import json

def csv_to_json(csv_file, json_file):
    data = []

    try:
        with open(csv_file, 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                data.append(row)
            print("Datos leídos del CSV:", data)  # Depuración: Imprimir los datos leídos

        with open(json_file, 'w', encoding='utf-8') as json_file:
            json_file.write(json.dumps(data, indent=4, ensure_ascii=False))
            print("Archivo JSON creado con éxito.")  # Depuración: Confirmar creación del archivo

    except Exception as e:
        print("Ocurrió un error:", e)  # Imprimir el error si ocurre alguno

csv_file_path = 'CSV-SCRAPING.csv'
json_file_path = 'productos.json'

csv_to_json(csv_file_path, json_file_path)
