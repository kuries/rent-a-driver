var citiesByState = {Punjab: ['Abohar', 'Amritsar', 'Haripur', 'Ludhiana', 'Pathankot', 'Patiala', ],
Telangana: ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Nalgonda', 'Nizamabad', 'Ramagundam', 'Warangal', ],
Tripura: ['Agartala', ],
'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Bakshpur', 'Bamanpuri', 'Bareilly', 'Bharauri', 'Budaun', 'Bulandshahr', 'Firozabad', 'Fyzabad', 'Ghaziabad', 'Gopalpur', 'Hapur', 'Hata', 'Jhansi', 'Lucknow', 'Mathura', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Saharanpur', 'Saidapur', 'Shahbazpur', 'Tharati Etawah', 'Varanasi', ],
Maharashtra: ['Ahmadnagar', 'Akola', 'Amaravati', 'Aurangabad', 'Bhiwandi', 'Bhusaval', 'Chanda', 'Kalyan', 'Khanapur', 'Kolhapur', 'Latur', 'Malegaon Camp', 'Mumbai', 'Nanded', 'Nasik', 'Parbhani', 'Pune', 'Sangli', ],
Gujarat: ['Ahmedabad', 'Bhavnagar', 'Bhuj', 'Ghandinagar', 'Navsari', 'Porbandar', 'Rajkot', 'Surat', 'Vadodara', ],
Mizoram: ['Aizawl  ', ],
Rajasthan: ['Ajmer', 'Alwar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Pali', 'Rampura', 'Sikar', 'Tonk', 'Udaipur', ],
Kerala: ['Alappuzha', 'Calicut', 'Kochi', 'Kollam', 'Thiruvananthapuram', ],
'West Bengal': ['Alipurduar', 'Asansol', 'Barddhaman', 'Bhatpara', 'Haldia', 'Haora', 'Kolkata ', 'Krishnanagar', 'Shiliguri', ],
Haryana: ['Ambala', 'Bhiwani', 'Faridabad', 'Gurugram', 'Hisar', 'Karnal', 'Panchkula', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', ],
Bihar: ['Aurangabad', 'Bhagalpur', 'Gaya', 'Muzaffarpur', 'Patna', 'Purnea', ],
'Jammu and Kashmir': ['Baramula', 'Jammu', 'Saidpur', 'Srinagar', ],
Karnataka: ['Belgaum', 'Bellary', 'Bengaluru', 'Bidar', 'Bijapur', 'Chikka Mandya', 'Davangere', 'Gulbarga', 'Hospet', 'Hubli', 'Kolar', 'Mangalore', 'Mysore', 'Raichur', 'Shimoga', ],
Chhattisgarh: ['Bhilai', 'Bilaspur', 'Raipur', ],
'Madhya Pradesh': ['Bhopal ', 'Gwalior', 'Indore', 'Jabalpur', 'Ratlam', 'Saugor', 'Ujjain', ],
Odisha: ['Bhubaneshwar', 'Brahmapur', 'Cuttack', 'Puri', 'Raurkela', 'Samlaipadar', 'Brajrajnagar', 'Talcher', ],
Chandigarh: ['Chandigarh ', ],
'Tamil Nadu' : ['Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul', 'Karur', 'Krishnapuram', 'Kumbakonam', 'Madurai', 'Nagercoil', 'Rajapalaiyam', 'Salem', 'Thanjavur', 'Tiruchchirappalli', 'Tirunelveli', 'Tiruvannamalai', 'Tuticorin', 'Valparai', 'Vellore', ],
'Andhra Pradesh': ['Chirala', 'Guntur', 'Hindupur', 'Kagaznagar', 'Kakinada', 'Kurnool', 'Machilipatnam', 'Nandyal', 'Nellore', 'Ongole', 'Proddatur', 'Rajahmundry', 'Tirupati', 'Vishakhapatnam', 'Vizianagaram', ],
'Daman and Diu': ['Daman', 'Diu', ],
Uttarakhand: ['DehraDun', ],
Delhi: ['Delhi', 'New Delhi', ],
Jharkhand: ['Dhanbad', 'Jamshedpur', 'Ranchi', 'Jorapokhar', ],
Assam: ['Dibrugarh', 'Dispur', 'Guwahati', 'Jorhat', 'Silchar', 'Tezpur', ],
Sikkim: ['Gangtok', ],
Manipur: ['Imphal', ],
'Arunachal Pradesh': ['Itanagar', ],
Lakshadweep: ['Kavaratti', ],
Nagaland: ['Kohima', ],
Goa: ['Panaji', ],
'Andaman and Nicobar Islands': ['Port Blair', ],
Puducherry: ['Puducherry', ],
Meghalaya: ['Shillong ', ],
'Himachal Pradesh': ['Shimla', ],
'Dadra and Nagar Haveli': ['Silvassa', ],
}

function makeSubmenu(value) {
    console.log(2);
    if(value.length==0) 
        document.getElementById("citySelect").innerHTML = "<option></option>";
    else {
        let citiesOptions = "";
        for(cityId in citiesByState[value]) {
            citiesOptions+="<option>"+citiesByState[value][cityId]+"</option>";
        }
        document.getElementById("citySelect").innerHTML = citiesOptions;
    }
    var select = document.getElementById("stateSelect");
    for(state in citiesByState) {
        select.appendChild(new Option(state, state));
    }
}

function displaySelected() { 
    var country = document.getElementById("stateSelect").value;
    var city = document.getElementById("citySelect").value;
    alert(country+"\n"+city);
}

window.onload = () => {
    stateOptions = '<option value="" disabled selected>Choose State</option>';
    for(state in citiesByState) {
        stateOptions+="<option>"+state+"</option>";
    }
    document.getElementById("stateSelect").innerHTML = stateOptions;
    document.getElementById("stateSelect").selectedIndex = 0;
    document.getElementById("citySelect").selectedIndex = 0;
}