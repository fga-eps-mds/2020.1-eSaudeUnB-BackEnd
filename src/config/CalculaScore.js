module.exports = {
    async calculateScore({
        bond,
        socialPrograms,
        studentHouseResidence,
        medication,
        mainComplaint,
    }) {
        let score = 0;
        if (mainComplaint === 'Tentativa de suicidio') {
            score += 837;
        } else if (mainComplaint === 'Ideacao suicida') {
            score += 427;
        } else if (mainComplaint === 'Solicitação para psiquiatria') {
            score += 305;
        } else if (mainComplaint === 'Depressão') {
            score += 218;
        } else if (mainComplaint === 'Ansiedade') {
            score += 79;
        } else if (mainComplaint === 'assédio, discriminação ou outro tipo de violência') {
            score += 57;
        } else if (mainComplaint === 'luto') {
            score += 40;
        } else if (mainComplaint === 'Conflito no trabalho') {
            score += 40;
        } else if (mainComplaint === 'Uso de drogas') {
            score += 11;
        } else if (mainComplaint === 'Problemas afetivos') {
            score += 8;
        } else if (mainComplaint === 'Problemas familiares') {
            score += 8;
        } else if (mainComplaint === 'Dificuldades academicas') {
            score += 8;
        } else if (mainComplaint === 'Problemas de saude') {
            score += 5;
        } else if (mainComplaint === 'Outros') {
            score += 4;
        }
        if (studentHouseResidence === 'sim') {
            score += 156;
        }
        if (socialPrograms === 'sim') {
            score += 111;
        }
        if (bond === 'estudante de graduacao') {
            score += 29;
        } else if (bond === 'estudante de mestrado') {
            score += 21;
        } else if (bond === 'estudante de doutorado') {
            score += 15;
        } else if (bond === 'tecnico-administrativo') {
            score += 3;
        } else if (bond === 'docente') {
            score += 2;
        }
        if (medication === 'sim') {
            score += 1;
        }

        return score;
    },
};
