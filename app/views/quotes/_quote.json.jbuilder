<%= turbo_frame_tag "quote_#{quote.id}" do %>
  <div class="quote">
    <p><strong>Author:</strong> <%= quote.author %></p>
    <p><strong>Content:</strong> <%= quote.content %></p>
    <%= link_to 'Edit', edit_quote_path(quote), class: 'btn btn-warning' %>
    <%= link_to 'Delete', quote, method: :delete, data: { turbo_confirm: 'Are you sure?' }, class: 'btn btn-danger' %>
  </div>
<% end %>
