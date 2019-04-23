
$(document).ready(() => {
    $("#firstname").on("input", () => {
        $.ajax({
            type : "POST",
            url : "/employees",
            data : {
                "firstname" : $("#firstname").val()
            },
            success : (result) => {
                if (result["errors"] !== undefined) {
                    $("#result").html(`<p class="text-center">No results.</p>`);
                    return;
                }
                let table = ``;
                table += `<p class="text-center">${result.length} employees has been fetched</p>`;
                table += `<table>`;
                table += `<tr>`;
                table += `<th>Employee ID</th>`;
                table += `<th>Employee Name</th>`;
                table += `<th>Employee Birthdate</th>`;
                table += `</tr>`;

                for (let i = 0; i < result.length; i++) {
                    table += `<tr>`;
                    table += `<td>${result[i].emp_no}</td>`;
                    table += `<td>${result[i].first_name + " " + result[i].last_name}</td>`;
                    table += `<td>${result[i].birth_date}</td>`;
                    table += `</tr>`;
                }
                $("#result").html(table);
            }
        })
    });
});