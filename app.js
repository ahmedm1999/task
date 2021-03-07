class Patient {
    constructor(primName, secName, age, gender, p_num, mob_num) {
        this.p_f_name = primName;
        this.p_s_name = secName;
        this.p_age = age;
        this.p_gender = gender;
        this.p_p_num = p_num;
        this.p_mob_num = mob_num ;
    }
} ;

const patient_1 = new Patient('Omar Jamal AlEasawi', 'عمر جمال العيسوي', 23, 'male', '1','0795023801') ;
const patient_2 = new Patient('Ahmed Hussam Mukahal', 'احمد حسام مكحل', 21, 'male', '2','0795023801') ;
const patient_3 = new Patient('Raad Ibraheem Hasan', 'رعد ابراهيم حسن', 20, 'male', '3','0795023801') ;
const patient_4 = new Patient('Salem AlOmar', 'سالم العمري', 50, 'male', '4','0795023801') ;
const patients = [patient_1, patient_2, patient_3, patient_4] ;
const patient_num_input = document.getElementById("patient-num") ;
const patient_mob_input = document.getElementById("patient-mob-num") ;
const pop_up = document.getElementById('pop-up') ;
const close_pop = document.getElementById("close-pop") ;
const patient_record = document.getElementById('patient-record') ;
const pop_list = document.getElementById("pop-list") ;
console.log(pop_up) ;
// console.log(patient_1, patient_2, patient_3, patient_4) ;

// Vars 
const inputsReadOnly = document.querySelectorAll(".readonly") ;
const searchIdBtn = document.getElementById("search-patient-btn") ;
const search_mob_btn = document.getElementById("search-patient-mob-btn") ;
const error_area = document.getElementById("error-area") ;

const showPatient = (value) => {
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].p_p_num === value) {
            for(let j = 0; j < inputsReadOnly.length; j++) {
                let data_ref = inputsReadOnly[j].getAttribute("data-ref")
                inputsReadOnly[j].value = patients[i][`${data_ref}`];
                error_area.style.display = 'none' ;
            }
        }
    }
    close_pop.click() ;
}

const serchPatient = (value) => {
    let counter = 0 ;
    for(let i = 0 ; i < patients.length; i++) {
        if(patients[i].p_p_num === value) {
            counter += 1 ;
            for(let j = 0; j < inputsReadOnly.length; j++) {
                let data_ref = inputsReadOnly[j].getAttribute("data-ref")
                inputsReadOnly[j].value = patients[i][`${data_ref}`];
                error_area.style.display = 'none' ;
            }
        }
    }
    if(counter == 0) {
        error_area.style.display = 'block' ;
        error_area.textContent = 'No Data Found' ; 
        for(let j = 0; j < inputsReadOnly.length; j++) {
            inputsReadOnly[j].value = '';
        } 
    }
};
const serchPatientMob = (value) => {
    let sameMobArr = new Array() ;
    for(let i = 0 ; i < patients.length; i++) {
        if(patients[i].p_mob_num === value) {
            sameMobArr.push(patients[i]) ;
        }
    }
    console.log(sameMobArr.length) ;
    if (sameMobArr.length > 1) {
        pop_up.style.top = '0' ;
        for(let i = 0; i < sameMobArr.length; i++) {
            const newElem = `<li id='patient-record'>
            <p>${sameMobArr[i]['p_f_name']}</p>
            <p>${sameMobArr[i]['p_p_num']}</p>
            <button class="select-patient-btn" id="select-btn" data-value="${sameMobArr[i]['p_p_num']}">Select</button>
            </li>`;
            pop_list.innerHTML += newElem ;
        }
        
    }
    // if(counter == 0) {
    //     error_area.style.display = 'block' ;
    //     error_area.textContent = 'No Data Found' ; 
    //     for(let j = 0; j < inputsReadOnly.length; j++) {
    //         inputsReadOnly[j].value = '';
    //     } 
    // }
};
searchIdBtn.addEventListener('click', () => {
    serchPatient(patient_num_input.value);
}) ;
search_mob_btn.addEventListener('click', () => {
    serchPatientMob(patient_mob_input.value);
}) ;
close_pop.addEventListener('click', () => {
    pop_up.style.top = '-100%' ;
    pop_list.innerHTML = '' ;
})
pop_list.addEventListener('click', (e) => {
    
    console.log() ;
    showPatient(e.target.getAttribute('data-value')) ;
}) ;