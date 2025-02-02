// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ClassRegistration {
    address public admin;
    mapping(uint256 => Student) public students;

    struct Student {
        string name;
        uint256 rollNumber;
        uint256 rollDate;
    }

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can register a student");
        _;
    }

    // modifier isNotZero(uint256 _ID) {
    //     require(_ID != 0, "Roll number must be greater than 0");
    //     _;
    // }

    event StudentRegistered(string name, uint256 rollNumber, uint256 rollDate);
    event StudentRemoved(uint256 rollNumber);

    function registerStudent(string memory studentName, uint256 rollNumber) public onlyAdmin {
        require(students[rollNumber].rollDate == 0, "Student already registered");
        students[rollNumber] = Student({
            name: studentName,
            rollNumber: rollNumber,
            rollDate: block.timestamp
        });
        emit StudentRegistered(studentName, rollNumber, block.timestamp);
    }

    function getStudentById(uint256 rollNumber) public view returns (Student memory) {
        require(students[rollNumber].rollNumber != 0, "Student not registered");
        return students[rollNumber];
    }

    function removeStudent(uint256 rollNumber) public onlyAdmin {
        require(students[rollNumber].rollDate != 0, "Student not registered");
        students[rollNumber] = Student("", 0, 0);
        emit StudentRemoved(rollNumber);
    }
}
