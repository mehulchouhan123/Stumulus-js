import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["params"]
    
    search() {
      const value = this.paramsTarget.value
  
      fetch(`/search?search=${value}`, {
        contentType: 'application/json',
        hearders: 'application/json'
      })
      .then((response) => {
        debugger
        // Log the status and headers of the response
        console.log('Response Status:', response.status);
        console.log('Response Headers:', [...response.headers]);
    
        // Parse the response as text
        return response.text();
      })
      .then(res => {
        $('#stories').html(res)
      })
    }
  }

// export default class extends Controller {
//   static values = { count: Number };

//   initialize() {
//     debugger
//     // You can initialize other properties or state here if needed
//     console.log('Counter initialized with count:', this.countValue);
//   }

//   connect() {
//     this.updateDisplay();
//   }

//   increment() {
//     this.countValue++;
//     this.updateDisplay();
//   }

//   updateDisplay() {
//     this.element.querySelector(".count-display").textContent = this.countValue;
//   }
// }