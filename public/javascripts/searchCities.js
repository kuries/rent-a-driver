var citiesByState = {'Andaman and Nicobar Islands': ['Port Blair', ],
'Andhra Pradesh': ['Chirala', 'Guntur', 'Hindupur', 'Kagaznagar', 'Kakinada', 'Kurnool', 'Machilipatnam', 'Nandyal', 'Nellore', 'Ongole', 'Proddatur', 'Rajahmundry', 'Tirupati', 'Vishakhapatnam', 'Vizianagaram', ],
'Arunachal Pradesh': ['Itanagar', ],
'Assam': ['Dibrugarh', 'Dispur', 'Guwahati', 'Jorhat', 'Silchar', 'Tezpur', ],
'Bihar': ['Aurangabad', 'Bhagalpur', 'Gaya', 'Muzaffarpur', 'Patna', 'Purnea', ],
'Chandigarh': ['Chandigarh ', ],
'Chhattisgarh': ['Bhilai', 'Bilaspur', 'Raipur', ],
'Dadra and Nagar Haveli': ['Silvassa', ],
'Daman and Diu': ['Daman', 'Diu', ],
'Delhi': ['Delhi', 'New Delhi', ],
'Goa': ['Panaji', ],
'Gujarat': ['Ahmedabad', 'Bhavnagar', 'Bhuj', 'Ghandinagar', 'Navsari', 'Porbandar', 'Rajkot', 'Surat', 'Vadodara', ],
'Haryana': ['Ambala', 'Bhiwani', 'Faridabad', 'Gurugram', 'Hisar', 'Karnal', 'Panchkula', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', ],
'Himachal Pradesh': ['Shimla', ],
'Jammu and Kashmir': ['Baramula', 'Jammu', 'Saidpur', 'Srinagar', ],
'Jharkhand': ['Dhanbad', 'Jamshedpur', 'Jorapokhar', 'Ranchi', ],
'Karnataka': ['Belgaum', 'Bellary', 'Bengaluru', 'Bidar', 'Bijapur', 'Chikka Mandya', 'Davangere', 'Gulbarga', 'Hospet', 'Hubli', 'Kolar', 'Mangalore', 'Mysore', 'Raichur', 'Shimoga', ],
'Kerala': ['Alappuzha', 'Calicut', 'Kochi', 'Kollam', 'Thiruvananthapuram', ],
'Lakshadweep': ['Kavaratti', ],
'Madhya Pradesh': ['Bhopal ', 'Gwalior', 'Indore', 'Jabalpur', 'Ratlam', 'Saugor', 'Ujjain', ],
'Maharashtra': ['Ahmadnagar', 'Akola', 'Amaravati', 'Aurangabad', 'Bhiwandi', 'Bhusaval', 'Chanda', 'Kalyan', 'Khanapur', 'Kolhapur', 'Latur', 'Malegaon Camp', 'Mumbai', 'Nanded', 'Nasik', 'Parbhani', 'Pune', 'Sangli', ],
'Manipur': ['Imphal', ],
'Meghalaya': ['Shillong ', ],
'Mizoram': ['Aizawl  ', ],
'Nagaland': ['Kohima', ],
'Odisha': ['Bhubaneshwar', 'Brahmapur', 'Brajrajnagar', 'Cuttack', 'Puri', 'Raurkela', 'Samlaipadar', 'Talcher', ],
'Puducherry': ['Puducherry', ],
'Punjab': ['Abohar', 'Amritsar', 'Haripur', 'Ludhiana', 'Pathankot', 'Patiala', ],
'Rajasthan': ['Ajmer', 'Alwar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Pali', 'Rampura', 'Sikar', 'Tonk', 'Udaipur', ],
'Sikkim': ['Gangtok', ],
'Tamil Nadu ': ['Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul', 'Karur', 'Krishnapuram', 'Kumbakonam', 'Madurai', 'Nagercoil', 'Rajapalaiyam', 'Salem', 'Thanjavur', 'Tiruchchirappalli', 'Tirunelveli', 'Tiruvannamalai', 'Tuticorin', 'Valparai', 'Vellore', ],
'Telangana': ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Nalgonda', 'Nizamabad', 'Ramagundam', 'Warangal', ],
'Tripura': ['Agartala', ],
'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Bakshpur', 'Bamanpuri', 'Bareilly', 'Bharauri', 'Budaun', 'Bulandshahr', 'Firozabad', 'Fyzabad', 'Ghaziabad', 'Gopalpur', 'Hapur', 'Hata', 'Jhansi', 'Lucknow', 'Mathura', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Saharanpur', 'Saidapur', 'Shahbazpur', 'Tharati Etawah', 'Varanasi', ],
'Uttarakhand': ['DehraDun', ],
'West Bengal': ['Alipurduar', 'Asansol', 'Barddhaman', 'Bhatpara', 'Haldia', 'Haora', 'Kolkata ', 'Krishnanagar', 'Shiliguri', ],
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