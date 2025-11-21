document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    const msgSucesso = document.getElementById('mensagemSucesso');

    if (form && msgSucesso) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome.length < 3) {
                alert("Por favor, digite um nome válido (mínimo 3 caracteres).");
                return;
            }

            if (mensagem === "") {
                alert("Por favor, escreva sua mensagem.");
                return;
            }

            // Simulação de envio de sucesso
            msgSucesso.style.display = 'block';
            msgSucesso.innerText = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;

            form.reset();

            // Esconde a mensagem após 5 segundos
            setTimeout(() => {
                msgSucesso.style.display = 'none';
            }, 5000);
        });
    }

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = '#4a3424'; // Cor mais escura ao rolar
            } else {
                header.style.backgroundColor = '#6F4E37'; // Cor original
            }
        });
    }
    const cartSection = document.getElementById('cart');
    const cartButton = document.getElementById('cart-button');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');
    const buyButtons = document.querySelectorAll('.btn-comprar');

    if (cartSection && cartButton) {
        const cart = [];

        // Formatar moeda
        function formatPrice(value) {
            return value.toFixed(2).replace('.', ',');
        }

        // Renderizar a lista do carrinho
        function renderCart() {
            cartItemsList.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price;

                const li = document.createElement('li');
                
                // Texto do item
                const spanItem = document.createElement('span');
                spanItem.textContent = `${item.name} - R$ ${formatPrice(item.price)}`;
                
                // Botão de remover
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'X';
                removeBtn.title = 'Remover item';
                removeBtn.addEventListener('click', () => {
                    cart.splice(index, 1);
                    renderCart();
                });

                li.appendChild(spanItem);
                li.appendChild(removeBtn);
                cartItemsList.appendChild(li);
            });

            // Atualiza contadores
            if (cartCountSpan) cartCountSpan.textContent = cart.length;
            if (cartTotalSpan) cartTotalSpan.textContent = formatPrice(total);
        }

        // Adicionar ao carrinho
        if (buyButtons) {
            buyButtons.forEach(btn => {
                btn.addEventListener('click', function(event) {
                    event.preventDefault(); // Evita comportamento padrão do link

                    const card = this.closest('.card');
                    if (!card) return;

                    const name = card.querySelector('h3').textContent;
                    // Pega o preço, remove "R$", remove pontos de milhar e troca vírgula por ponto
                    const priceText = card.querySelector('strong').textContent
                        .replace('R$', '')
                        .replace(/\./g, '')
                        .replace(',', '.')
                        .trim();

                    const price = parseFloat(priceText);
                    if (isNaN(price)) return;

                    cart.push({ name, price });
                    renderCart();
                    
                    // Abre o carrinho automaticamente ao adicionar (opcional)
                    cartSection.style.display = 'block';
                });
            });
        }

        // Alternar exibição do carrinho (Botão no header)
        cartButton.addEventListener('click', () => {
            if (cartSection.style.display === 'none' || cartSection.style.display === '') {
                cartSection.style.display = 'block';
            } else {
                cartSection.style.display = 'none';
            }
        });

        // Botão Finalizar Pedido
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Seu carrinho está vazio.');
                    return;
                }
                alert(`Pedido recebido! Total: R$ ${cartTotalSpan.textContent}. Obrigado pela preferência!`);
                // Limpa carrinho após finalizar
                cart.length = 0; // Esvazia array
                renderCart();
                cartSection.style.display = 'none';
            });
        }
    }
});
