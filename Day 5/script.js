const API_URL = "http://localhost:3000/product";
        let editId = null;

        async function fetchPosts() {
            const res = await fetch(API_URL + '?_limit=5');
            const posts = await res.json();
            const list = document.getElementById("postList");
            list.innerHTML = '';
            posts.forEach(post => {
                list.innerHTML += `
        <tr>
          <td>${post.id}</td>
          <td>${post.product}</td>
          <td>${post.price}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="startEdit('${post.id}', '${post.product.replace(/'/g, "\\'")}', '${post.price}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deletePost('${post.id}')">Delete</button>
          </td>
        </tr>
      `;
            });
        }

        async function createOrUpdatePost() {
            const inputProduct = document.getElementById('product');
            const inputPrice = document.getElementById('price');
            const product = inputProduct.value.trim();
            const price = inputPrice.value.trim();

            const method = editId ? 'PUT' : 'POST';
            const url = editId ? `${API_URL}/${editId}` : API_URL;

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, price })
            });

            const result = await response.json();
            alert(editId ? 'Post updated!' : 'Post added!');
            input.value = '';
            editId = null;
            fetchPosts();
        }

        function startEdit(id, product, price) {
            document.getElementById('product').value = product;
            document.getElementById('price').value = price;
            editId = id;
        }

        async function deletePost(id) {
            const confirmed = confirm("Are you sure you want to delete?");
            if (!confirmed) return;

            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            alert('Post deleted!');
            fetchPosts();
        }

        fetchPosts();
 
 