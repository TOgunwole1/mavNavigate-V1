import struct
import json
import os

def parse_glb(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'rb') as f:
        # Read header
        magic = f.read(4)
        if magic != b'glTF':
            print("Not a valid GLB file.")
            return
        
        version = struct.unpack('<I', f.read(4))[0]
        length = struct.unpack('<I', f.read(4))[0]
        
        print(f"GLB Version: {version}, Total Length: {length}")

        # Read chunks
        while f.tell() < length:
            chunk_len_data = f.read(4)
            if not chunk_len_data:
                break
            chunk_length = struct.unpack('<I', chunk_len_data)[0]
            chunk_type = f.read(4)
            
            if chunk_type == b'JSON':
                json_data = f.read(chunk_length)
                data = json.loads(json_data.decode('utf-8'))
                search_nodes(data)
                break 
            else:
                f.seek(chunk_length, 1)

def search_nodes(data):
    print("\n--- Searching for 'University' or 'Centre' ---")
    
    nodes = data.get('nodes', [])
    meshes = data.get('meshes', [])
    
    found = False
    
    for i, node in enumerate(nodes):
        name = node.get('name', '')
        if 'university' in name.lower() or 'centre' in name.lower():
            found = True
            print(f"\nMatch found in Node [{i}]:")
            print(f"  Name: {name}")
            if 'translation' in node:
                print(f"  Translation: {node['translation']}")
            if 'mesh' in node:
                mesh_index = node['mesh']
                if mesh_index < len(meshes):
                    mesh_name = meshes[mesh_index].get('name', 'Unnamed Mesh')
                    print(f"  Mesh Name: {mesh_name}")

    for i, mesh in enumerate(meshes):
        name = mesh.get('name', '')
        if 'university' in name.lower() or 'centre' in name.lower():
            found = True
            print(f"\nMatch found in Mesh [{i}]:")
            print(f"  Name: {name}")

    if not found:
        print("No matches found.")

if __name__ == "__main__":
    file_path = 'assets/models/university.glb'
    parse_glb(file_path)
