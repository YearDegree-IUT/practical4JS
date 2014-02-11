<ul>
    <% _.forEach(characters, function (character) { %>
        <li><%- character.name %><button class="delete" data-id="<%= character._id %>">-</button></li>
    <% }); %>
</ul>
